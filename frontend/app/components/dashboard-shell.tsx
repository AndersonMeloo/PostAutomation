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
import {
    ChartNoAxesCombined,
    ChevronLeft,
    ChevronsRight,
    FolderTree,
    LayoutDashboard,
    LogOut,
    PlayCircle,
    Shapes,
    ShieldCheck,
    Sparkles,
    User,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

const navItems = [
    { href: "/", label: "Início", icon: LayoutDashboard },
    { href: "/auth", label: "Rotas", icon: ShieldCheck },
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
    const [collapsed, setCollapsed] = useState(false);
    const isProfileActive = pathname.startsWith("/users");

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
                const result = await getYoutubeConnectionStatus(session.userId, session.accessToken);
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
            {/* <div className="premium-shell h-[100dvh] w-full overflow-hidden p-3 md:p-5"> */}
            {/* <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-4 overflow-hidden md:flex-row"> */}
            <div className="premium-shell h-screen overflow-hidden p-3 md:p-5">
                <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden md:flex-row">
                    <aside
                        className={`dashboard-card relative z-10 flex w-full flex-col gap-4 overflow-hidden p-4 transition-[width,padding,transform,box-shadow] duration-500 ease-in-out md:h-full md:shrink-0 ${collapsed ? "md:w-[88px] md:px-3" : "md:w-[280px] md:px-4"
                            }`}
                    >
                        <button
                            type="button"
                            onClick={() => setCollapsed((value) => !value)}
                            className={`absolute right-3 top-3 z-20 hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,#7c9cff,#57d7ff)] text-white shadow-lg shadow-cyan-500/20 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-cyan-500/30 md:flex ${collapsed ? "rotate-180" : "rotate-0"
                                }`}
                            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
                        >
                            {collapsed ? <ChevronsRight size={18} /> : <ChevronLeft size={18} />}
                        </button>

                        {/* <div className="rounded-3xl border border-white/8 bg-white/5 p-4 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7c9cff,#57d7ff)] text-white shadow-lg shadow-cyan-500/20">
                                    <Sparkles size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                                        SocialMediaAutoPublisher
                                    </p>
                                    <h1
                                        className={`mt-1 overflow-hidden truncate text-base font-semibold text-white transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[180px] opacity-100 translate-x-0"
                                            }`}
                                    >
                                        Premium Console
                                    </h1>
                                </div>
                            </div>
                        </div> */}

                        <nav className="grid grid-cols-1 gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                const link = (
                                    <Link
                                        href={item.href}
                                        className={`group flex w-full items-center rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all duration-500 ease-in-out hover:-translate-y-0.5 ${collapsed ? "justify-center gap-0" : "gap-3"
                                            } ${isActive
                                                ? "card-gradient card-gradient-overlay border-transparent shadow-lg shadow-cyan-500/20"
                                                : "border-white/8 bg-white/4 text-slate-200 hover:border-white/12 hover:bg-white/7"
                                            }`}
                                    >
                                        <Icon
                                            size={20}
                                            className={`transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                                }`}
                                        />
                                        <span
                                            className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[160px] opacity-100 translate-x-0"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                );

                                if (!collapsed) {
                                    return link;
                                }

                                return (
                                    <Tooltip.Root key={item.href}>
                                        <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                side="right"
                                                sideOffset={-8}
                                                className="z-[9999] rounded-2xl border border-white/10 bg-[#111113] px-3 py-2 text-sm text-white shadow-2xl shadow-black/40 backdrop-blur-xl animate-fade-up"
                                            >
                                                {item.label}
                                                <Tooltip.Arrow className="fill-[#111113]" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                );
                            })}
                        </nav>

                        <div className="mt-auto space-y-3 pt-4">
                            <div className="rounded-3xl border border-white/8 bg-white/5 p-3 backdrop-blur-xl">
                                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Integração</p>
                                <p
                                    className={`mt-2 overflow-hidden text-sm text-slate-300 transition-all duration-500 ease-in-out ${collapsed ? "max-h-0 opacity-0 translate-y-1" : "max-h-24 opacity-100 translate-y-0"
                                        }`}
                                >
                                    Status do YouTube e atalho para conectar ou desconectar a conta.
                                </p>

                                <div className="mt-3 space-y-2">
                                    {youtubeConnected ? (
                                        <button
                                            type="button"
                                            onClick={() => void handleDisconnectYouTube()}
                                            disabled={youtubeActionLoading}
                                            className="premium-button-secondary w-full px-3 py-2 text-sm transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <PlayCircle size={16} />
                                            <span
                                                className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[180px] opacity-100 translate-x-0"
                                                    }`}
                                            >
                                                {youtubeActionLoading ? "Desconectando..." : "Desconectar YouTube"}
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleConnectYouTube}
                                            disabled={youtubeLoading}
                                            className="premium-button w-full px-3 py-2 text-sm transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            <PlayCircle size={16} />
                                            <span
                                                className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[180px] opacity-100 translate-x-0"
                                                    }`}
                                            >
                                                {youtubeLoading ? "Verificando conexão..." : "Conectar YouTube"}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {collapsed ? (
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <Link
                                            href="/users"
                                            className={`group flex items-center justify-center rounded-2xl border px-3 py-2.5 transition duration-200 hover:-translate-y-0.5 ${isProfileActive
                                                ? "card-gradient card-gradient-overlay border-transparent shadow-lg shadow-cyan-500/20"
                                                : "border-white/8 bg-white/4 text-slate-200 hover:border-white/12 hover:bg-white/7"
                                                }`}
                                        >
                                            <User
                                                size={20}
                                                className={`transition-colors ${isProfileActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                                    }`}
                                            />
                                        </Link>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            side="right"
                                            sideOffset={-8}
                                            className="z-[9999] rounded-2xl border border-white/10 bg-[#111113] px-3 py-2 text-sm text-white shadow-2xl shadow-black/40 backdrop-blur-xl animate-fade-up"
                                        >
                                            Perfil
                                            <Tooltip.Arrow className="fill-[#111113]" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            ) : (
                                <Link
                                    href="/users"
                                    className={`group flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-500 ease-in-out hover:-translate-y-0.5 ${isProfileActive
                                        ? "card-gradient card-gradient-overlay border-transparent shadow-lg shadow-cyan-500/20"
                                        : "border-white/8 bg-white/4 text-slate-200 hover:border-white/12 hover:bg-white/7"
                                        }`}
                                >
                                    <User
                                        size={20}
                                        className={`transition-colors duration-300 ${isProfileActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                            }`}
                                    />
                                    <span
                                        className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[160px] opacity-100 translate-x-0"
                                            }`}
                                    >
                                        Perfil
                                    </span>
                                </Link>
                            )}

                            {collapsed ? (
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="group flex w-full items-center justify-center rounded-2xl border border-white/8 bg-white/4 px-3 py-2.5 text-sm text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/7"
                                        >
                                            <LogOut size={20} className="transition-colors text-slate-400 group-hover:text-white" />
                                        </button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            side="right"
                                            sideOffset={-8}
                                            className="z-[9999] rounded-2xl border border-white/10 bg-[#111113] px-3 py-2 text-sm text-white shadow-2xl shadow-black/40 backdrop-blur-xl animate-fade-up"
                                        >
                                            Sair
                                            <Tooltip.Arrow className="fill-[#111113]" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="group flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-2.5 text-sm text-slate-200 transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/7"
                                >
                                    <LogOut size={20} className="transition-colors duration-300 text-slate-400 group-hover:text-white" />
                                    <span
                                        className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[120px] opacity-100 translate-x-0"
                                            }`}
                                    >
                                        Sair
                                    </span>
                                </button>
                            )}
                        </div>
                    </aside>

                    <main className="dashboard-card min-h-0 min-w-0 flex-1 !overflow-y-auto !overflow-x-hidden p-4 md:h-[calc(100dvh-2.5rem)] md:p-7">
                        {!youtubeLoading && !youtubeConnected ? (
                            <section className="mb-5 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-white/5 to-cyan-500/10 p-5 text-white shadow-lg shadow-black/20">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="max-w-2xl">
                                        <p className="text-xs uppercase tracking-[0.24em] text-amber-200/90">Integração pendente</p>
                                        <h2 className="mt-2 text-xl font-semibold">Conexão com YouTube não concluída</h2>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            Você pode navegar normalmente. Conecte o YouTube para habilitar recursos dependentes da conta da plataforma.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleConnectYouTube}
                                        className="premium-button px-4 py-2.5 text-sm"
                                    >
                                        Conectar YouTube agora
                                    </button>
                                </div>
                            </section>
                        ) : null}

                        <div className="animate-fade-up">{children}</div>
                    </main>
                </div>
            </div>
        </Tooltip.Provider>
    );
}
