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
import { ChartNoAxesCombined, ChevronLeft, ChevronsRight, FolderTree, LayoutDashboard, LogOut, Shapes, ShieldCheck, User } from "lucide-react";

import * as Tooltip from "@radix-ui/react-tooltip";

const navItems = [
    { href: "/", label: "Ínicio", icon: LayoutDashboard },
    { href: "/auth", label: "Rotas", icon: ShieldCheck },
    // { href: "/users", label: "", icon: User },
    { href: "/niches", label: "Nichos", icon: Shapes },
    { href: "/posts", label: "Postagens", icon: FolderTree },
    { href: "#", label: "Métricas", icon: ChartNoAxesCombined },
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

    const isProfileActive = pathname.startsWith("/users");
    const [collapsed, setCollapsed] = useState(false);

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

        <Tooltip.Provider delayDuration={80}>
            <div className="min-h-screen w-full p-2 md:p-3 bg-river">
                <div className={`grid min-h-[calc(100vh-1rem)] w-full gap-3 transition-all duration-300 
                ${collapsed
                        ? "grid-cols-1 md:grid-cols-[72px_1fr]"
                        : "grid-cols-1 md:grid-cols-[220px_1fr]"
                    }`}>


                    <aside className={`relative rounded-3xl bg-river shadow-sm md:sticky md:top-6 md:h-[calc(100vh-3rem)] flex flex-col transition-all duration-300 shadow-custom py-6
                    ${collapsed
                            ? "w-18 p-2"
                            : "w-55 p-4"
                        }`}
                    >

                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="absolute -right-5 -top-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-circle text-white border border-white/10 shadow-lg shadow-violet-500/25 hover:scale-105 hover:shadow-violet-500/40 transition-all cursor-pointer"
                        >
                            {collapsed ? <ChevronsRight size={18} /> : <ChevronLeft size={18} />}
                        </button>

                        {/* <div className="mb-6 rounded-2xl bg-panel-strong p-4 text-white">
                        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">
                            SocialMediaAutoPublisher
                        </p>
                        <h1 className="mt-2 text-lg font-semibold leading-tight text-center">
                            PostAutomation
                        </h1>
                    </div> */}

                        <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
                            {navItems.map((item) => {

                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Tooltip.Root key={`${item.href}-${collapsed}`}>
                                        <Tooltip.Trigger asChild>
                                            <Link
                                                href={item.href}
                                                className={`group flex items-center w-full rounded-xl border-none px-3 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5
                ${collapsed
                                                        ? "justify-center"
                                                        : "gap-2"
                                                    }
                ${isActive
                                                        ? "card-gradient card-gradient-overlay"
                                                        : "text-white hover:text-[#9C5260]"
                                                    }`}
                                            >
                                                {Icon && (
                                                    <Icon
                                                        size={22}
                                                        className={`transition-colors ${isActive
                                                            ? "text-white"
                                                            : "group-hover:text-[#9C526D]"
                                                            }`}
                                                    />
                                                )}

                                                {!collapsed && (
                                                    <span
                                                        className={`transition-colors ${isActive
                                                            ? "text-white"
                                                            : "group-hover:text-[#9C5260]"
                                                            }`}
                                                    >
                                                        {item.label}
                                                    </span>
                                                )}
                                            </Link>
                                        </Tooltip.Trigger>

                                        {collapsed && (
                                            <Tooltip.Portal>
                                                <Tooltip.Content
                                                    side="right"
                                                    sideOffset={-10}
                                                    className="rounded-md dashboard-card px-3 py-1.5 text-sm text-white shadow-lg animate-in fade-in-0 zoom-in-95 data-[side=right]:slide-in-from-left-2"
                                                >
                                                    {item.label}
                                                    <Tooltip.Arrow className="fill-zinc-900" />
                                                </Tooltip.Content>
                                            </Tooltip.Portal>
                                        )}
                                    </Tooltip.Root>
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
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <Link
                                        href="/users"
                                        className={`group flex items-center rounded-xl px-3 py-2 transition hover:-translate-y-0.5 ${collapsed
                                            ? "justify-center"
                                            : "gap-3"
                                            } ${isProfileActive
                                                ? "card-gradient card-gradient-overlay"
                                                : "text-white hover:text-[#9C5260]"
                                            }`}
                                    >
                                        <User
                                            size={22}
                                            className={`transition-colors ${isProfileActive
                                                ? "text-white"
                                                : "group-hover:text-[#9C526D]"
                                                }`}
                                        />

                                        {!collapsed && (
                                            <span
                                                className={`transition-colors ${isProfileActive
                                                    ? "text-white"
                                                    : "group-hover:text-[#9C5260]"
                                                    }`}
                                            >
                                                Perfil
                                            </span>
                                        )}
                                    </Link>
                                </Tooltip.Trigger>

                                {collapsed && (
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            side="right"
                                            sideOffset={-12}
                                            className="rounded-md dashboard-card px-3 py-1.5 text-sm text-white shadow-lg animate-in fade-in-0 zoom-in-95 data-[side=right]:slide-in-from-left-2"                                        >
                                            Perfil
                                            <Tooltip.Arrow className="fill-zinc-900" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                )}
                            </Tooltip.Root>
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
        </Tooltip.Provider>
    );
}
