"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getSession } from "../lib/auth-client";
import {
    API_BASE_URL,
    disconnectYoutubeConnection,
    getYoutubeConnectionStatus,
} from "../lib/api";
import { FolderTree, LayoutDashboard, LogOut, Shapes, ShieldCheck, User } from "lucide-react";

const navItems = [
    { href: "/", label: "", icon: LayoutDashboard }, // Visão geral
    { href: "/auth", label: "", icon: ShieldCheck }, // Auth
    // { href: "/users", label: "", icon: User },
    { href: "/niches", label: "", icon: Shapes }, // Nichos
    { href: "/posts", label: "", icon: FolderTree }, // Postagens
];

type DashboardShellProps = {
    children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/cadastro");
    const [youtubeConnected, setYoutubeConnected] = useState(false);
    const [youtubeLoading, setYoutubeLoading] = useState(true);
    const [youtubeActionLoading, setYoutubeActionLoading] = useState(false);

    useEffect(() => {
        async function loadYoutubeStatus() {
            if (isAuthPage) {
                setYoutubeLoading(false);
                return;
            }

            setYoutubeLoading(true);
            const session = getSession();

            if (!session.accessToken || !session.userId) {
                setYoutubeConnected(false);
                setYoutubeLoading(false);
                return;
            }

            try {
                const result = await getYoutubeConnectionStatus(
                    session.userId,
                    session.accessToken,
                );
                setYoutubeConnected(result.connected);
            } catch {
                setYoutubeConnected(false);
            } finally {
                setYoutubeLoading(false);
            }
        }

        void loadYoutubeStatus();
    }, [isAuthPage, pathname]);

    if (isAuthPage) {
        return <div className="min-h-screen w-full">{children}</div>;
    }

    function handleLogout() {
        clearSession();
        setYoutubeConnected(false);
        setYoutubeLoading(false);
        router.push("/login");
    }

    function handleConnectYouTube() {
        window.location.assign(`${API_BASE_URL}/auth/google`);
    }

    async function handleDisconnectYouTube() {
        const session = getSession();

        if (!session.accessToken || !session.userId) {
            return;
        }

        setYoutubeActionLoading(true);
        try {
            await disconnectYoutubeConnection(session.userId, session.accessToken);
            setYoutubeConnected(false);
        } finally {
            setYoutubeActionLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full p-2 md:p-3 bg-river">
            <div className="grid min-h-[calc(100vh-1rem)] w-full grid-cols-1 gap-3 md:grid-cols-[140px_1fr]">
                <aside className="rounded-3xl bg-river p-4 shadow-sm md:p-6 md:sticky md:top-6 md:h-[calc(100vh-3rem)] flex flex-col">
                    <div className="mb-6 rounded-2xl bg-panel-strong p-4 text-white">
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">
                            {/* SocialMediaAutoPublisher */}
                        </p>
                        <h1 className="mt-2 text-lg font-semibold leading-tight text-center">
                            PostAutomation
                        </h1>
                    </div>

                    <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex items-center gap-2 rounded-xl border-none px-3 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5"
                                >
                                    {Icon && <Icon size={22} className="group-hover:text-[#9C526D]" />}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto space-y-3">
                        {youtubeConnected ? (
                            <button
                                type="button"
                                onClick={() => void handleDisconnectYouTube()}
                                disabled={youtubeActionLoading}
                                className="w-full rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-60 cursor-pointer"
                            >
                                {youtubeActionLoading
                                    ? "Desconectando..."
                                    : "Desconectar conta YouTube"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleConnectYouTube}
                                disabled={youtubeLoading}
                                className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60 cursor-pointer"
                            >
                                {youtubeLoading
                                    ? "Verificando conexão..."
                                    : "Conectar YouTube"}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white transition hover:text-[#9C526D] cursor-pointer"
                        >
                            <LogOut />
                        </button>

                        <Link
                            href="/users"
                            className="flex items-center gap-3 rounded-xl px-3 py-2 text-white transition hover:text-[#9C526D]"
                        >
                            <User size={22} />
                            Perfil
                        </Link>
                    </div>
                </aside>

                <main className="rounded-3xl bg-river p-4 shadow-sm md:p-8">
                    {!youtubeLoading && !youtubeConnected ? (
                        <section className="mb-4 rounded-xl bg-jaguar p-4">
                            <h2 className="text-base font-semibold text-amber-900">
                                Conexao com YouTube pendente
                            </h2>
                            <p className="mt-1 text-sm text-amber-800">
                                Voce pode navegar normalmente. Conecte o YouTube para habilitar
                                recursos que dependem da conta da plataforma.
                            </p>
                            <button
                                type="button"
                                onClick={handleConnectYouTube}
                                className="mt-3 rounded-lg  px-4 py-2 text-sm font-semibold text-white cursor-pointer transition card-gradient card-gradient-overlay"
                            >
                                Conectar YouTube agora
                            </button>
                        </section>
                    ) : null}

                    {children}
                </main>
            </div>
        </div>
    );
}
