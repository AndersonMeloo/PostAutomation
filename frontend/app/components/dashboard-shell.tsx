"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getSession } from "../lib/auth-client";
import { useTheme } from "../lib/theme-context";
import {
    disconnectYoutubeConnection,
    getYoutubeConnectionStatus,
    getYoutubeConnectUrl,
} from "../lib/api";
import {
    ChartNoAxesCombined,
    ChevronsLeft,
    ChevronsRight,
    Clapperboard,
    FolderTree,
    LayoutDashboard,
    LogOut,
    Menu,
    Moon,
    PlayCircle,
    Shapes,
    ShieldCheck,
    Sun,
    User,
    X,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { LucideIcon } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Início", icon: LayoutDashboard },
    { href: "/auth", label: "Rotas", icon: ShieldCheck },
    { href: "/niches", label: "Nichos", icon: Shapes },
    { href: "/posts", label: "Postagens", icon: FolderTree },
    { href: "/videos", label: "Vídeos", icon: Clapperboard },
    { href: "/metrics", label: "Métricas", icon: ChartNoAxesCombined },
];

// Reaproveitado pela sidebar desktop (com suporte a collapsed) e pelo menu
// mobile (sempre collapsed={false}) - elimina a duplicação de markup entre os dois.
function NavItem({
    href,
    label,
    icon: Icon,
    isActive,
    collapsed,
    onClick,
}: {
    href: string;
    label: string;
    icon: LucideIcon;
    isActive: boolean;
    collapsed: boolean;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`group flex w-full items-center rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all duration-500 ease-in-out hover:-translate-y-0.5 gap-2 ${collapsed ? "justify-center gap-0" : "gap-3"
                } ${isActive
                    ? "card-gradient card-gradient-overlay border-transparent shadow-lg shadow-cyan-500/20"
                    : "dash-chip"
                }`}
        >
            <Icon
                size={20}
                className={`transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-foreground"
                    }`}
            />
            <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed
                    ? "max-w-0 opacity-0 translate-x-2"
                    : "max-w-[160px] opacity-100 translate-x-0"
                    }`}
            >
                {label}
            </span>
        </Link>
    );
}

type DashboardShellProps = {
    children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    // A Home pública ("/"), login/cadastro, o callback do login com Google e
    // o blog têm layout próprio, sem a sidebar do dashboard.
    const isAuthPage =
        pathname === "/" ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/cadastro") ||
        pathname.startsWith("/auth/google/callback") ||
        pathname.startsWith("/blog");
    const [youtubeConnected, setYoutubeConnected] = useState(false);
    const [youtubeLoading, setYoutubeLoading] = useState(true);
    const [youtubeActionLoading, setYoutubeActionLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const isProfileActive = pathname.startsWith("/users");

    // Em telas de tablet a sidebar expandida sobra pouco espaço pro conteúdo -
    // começa colapsada por padrão (o botão manual continua funcionando normalmente).
    useEffect(() => {
        const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
        if (isTablet) {
            setCollapsed(true);
        }
    }, []);

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
        setMobileOpen(false);
        router.push("/login");
    }

    async function handleConnectYouTube() {
        const session = getSession();

        if (!session.accessToken) {
            router.push("/login");
            return;
        }

        setYoutubeActionLoading(true);
        try {
            const { url } = await getYoutubeConnectUrl(session.accessToken);
            window.location.assign(url);
        } finally {
            setYoutubeActionLoading(false);
        }
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

    // Fechar mobile menu ao clicar em qualquer link de navegação
    function handleMobileNavClick() {
        setMobileOpen(false);
    }

    return (
        <Tooltip.Provider delayDuration={80}>
            <div className="premium-shell h-screen overflow-hidden p-3 md:p-5">
                <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden md:flex-row">
                    {/* Desktop Sidebar */}
                    <aside
                        className={`
                            hidden md:flex dashboard-card relative z-10 flex-col gap-4 overflow-hidden p-4 transition-[width,padding,box-shadow] duration-500 ease-in-out
                            md:h-full md:shrink-0
                            ${collapsed ? "md:w-[88px] md:px-3" : "md:w-[280px] md:px-4"}
                        `}
                    >
                        {/* Botão collapse desktop */}
                        <button
                            type="button"
                            onClick={() => setCollapsed((value) => !value)}
                            className="absolute right-3 top-3 z-20 hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,#7c9cff,#57d7ff)] text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 md:flex"
                        >
                            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
                        </button>

                        <nav className="grid grid-cols-1 gap-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;

                                const link = (
                                    <NavItem
                                        key={item.href}
                                        href={item.href}
                                        label={item.label}
                                        icon={item.icon}
                                        isActive={isActive}
                                        collapsed={collapsed}
                                    />
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
                            <div className="dash-panel rounded-3xl border p-3">
                                <p
                                    className={`overflow-hidden text-[11px] uppercase tracking-[0.22em] text-muted transition-all duration-500 ease-in-out ${collapsed ? "max-h-0 opacity-0" : "max-h-6 opacity-100"
                                        }`}
                                >
                                    Integração
                                </p>
                                <p
                                    className={`overflow-hidden text-sm text-muted transition-all duration-500 ease-in-out ${collapsed ? "max-h-0 opacity-0 translate-y-1" : "mt-2 max-h-24 opacity-100 translate-y-0"
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
                                            onClick={() => void handleConnectYouTube()}
                                            disabled={youtubeLoading || youtubeActionLoading}
                                            className="premium-button w-full px-3 py-2 text-sm transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            <PlayCircle size={16} />
                                            <span
                                                className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[180px] opacity-100 translate-x-0"
                                                    }`}
                                            >
                                                {youtubeActionLoading
                                                    ? "Redirecionando..."
                                                    : youtubeLoading
                                                        ? "Verificando conexão..."
                                                        : "Conectar YouTube"}
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
                                                : "dash-chip"
                                                }`}
                                        >
                                            <User
                                                size={20}
                                                className={`transition-colors ${isProfileActive ? "text-white" : "text-slate-400 group-hover:text-foreground"
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
                                        : "dash-chip"
                                        }`}
                                >
                                    <User
                                        size={20}
                                        className={`transition-colors duration-300 ${isProfileActive ? "text-white" : "text-slate-400 group-hover:text-foreground"
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
                                            onClick={toggleTheme}
                                            className="dash-chip group flex w-full items-center justify-center rounded-2xl border px-3 py-2.5 text-sm transition duration-200 hover:-translate-y-0.5"
                                        >
                                            {theme === "dark" ? (
                                                <Sun size={20} className="transition-colors text-slate-400 group-hover:text-foreground" />
                                            ) : (
                                                <Moon size={20} className="transition-colors text-slate-400 group-hover:text-foreground" />
                                            )}
                                        </button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            side="right"
                                            sideOffset={-8}
                                            className="z-[9999] rounded-2xl border border-white/10 bg-[#111113] px-3 py-2 text-sm text-white shadow-2xl shadow-black/40 backdrop-blur-xl animate-fade-up"
                                        >
                                            {theme === "dark" ? "Tema claro" : "Tema escuro"}
                                            <Tooltip.Arrow className="fill-[#111113]" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            ) : (
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="dash-chip group flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm transition-all duration-500 ease-in-out hover:-translate-y-0.5"
                                >
                                    {theme === "dark" ? (
                                        <Sun size={20} className="transition-colors duration-300 text-slate-400 group-hover:text-foreground" />
                                    ) : (
                                        <Moon size={20} className="transition-colors duration-300 text-slate-400 group-hover:text-foreground" />
                                    )}
                                    <span
                                        className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ${collapsed ? "max-w-0 opacity-0 translate-x-2" : "max-w-[120px] opacity-100 translate-x-0"
                                            }`}
                                    >
                                        {theme === "dark" ? "Tema claro" : "Tema escuro"}
                                    </span>
                                </button>
                            )}

                            {collapsed ? (
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="dash-chip group flex w-full items-center justify-center rounded-2xl border px-3 py-2.5 text-sm transition duration-200 hover:-translate-y-0.5"
                                        >
                                            <LogOut size={20} className="transition-colors text-slate-400 group-hover:text-foreground" />
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
                                    className="dash-chip group flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm transition-all duration-500 ease-in-out hover:-translate-y-0.5"
                                >
                                    <LogOut size={20} className="transition-colors duration-300 text-slate-400 group-hover:text-foreground" />
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

                    {/* Conteúdo Principal */}
                    <main className="dashboard-card min-h-0 min-w-0 flex-1 !overflow-y-auto !overflow-x-hidden p-4 md:h-[calc(100dvh-2.5rem)] md:p-7">
                        {/* Mobile Menu Button */}
                        <div className="mb-4 flex items-center gap-3 md:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="dashboard-card bg-circle flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                            >
                                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                            {/* <span className="text-sm font-medium text-white">Menu</span> */}
                        </div>

                        {/* Mobile Menu Dropdown com animação melhorada */}
                        <div
                            className={`
                                md:hidden overflow-hidden transition-all duration-400 ease-in-out
                                ${mobileOpen
                                    ? "max-h-[800px] opacity-100 translate-y-0 mb-4"
                                    : "max-h-0 opacity-0 -translate-y-4"
                                }
                            `}
                        >
                            <div className="dashboard-card flex flex-col gap-2 p-4">
                                {navItems.map((item) => (
                                    <NavItem
                                        key={item.href}
                                        href={item.href}
                                        label={item.label}
                                        icon={item.icon}
                                        isActive={pathname === item.href}
                                        collapsed={false}
                                        onClick={handleMobileNavClick}
                                    />
                                ))}

                                <div className="my-2 h-px dash-divider" />

                                <Link
                                    href="/users"
                                    onClick={handleMobileNavClick}
                                    className={`group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${isProfileActive
                                        ? "card-gradient card-gradient-overlay border-transparent shadow-lg shadow-cyan-500/20"
                                        : "dash-chip"
                                        }`}
                                >
                                    <User
                                        size={20}
                                        className={`transition-colors duration-300 ${isProfileActive ? "text-white" : "text-slate-400 group-hover:text-foreground"
                                            }`}
                                    />
                                    <span>Perfil</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="dash-chip group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {theme === "dark" ? (
                                        <Sun size={20} className="transition-colors duration-300 text-slate-400 group-hover:text-foreground" />
                                    ) : (
                                        <Moon size={20} className="transition-colors duration-300 text-slate-400 group-hover:text-foreground" />
                                    )}
                                    <span>{theme === "dark" ? "Tema claro" : "Tema escuro"}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="dash-chip group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <LogOut size={20} className="transition-colors duration-300 text-slate-400 group-hover:text-foreground" />
                                    <span>Sair</span>
                                </button>

                                {/* Integração YouTube no mobile */}
                                <div className="dash-panel mt-2 rounded-3xl border p-3">
                                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Integração</p>
                                    <div className="mt-2 space-y-2">
                                        {youtubeConnected ? (
                                            <button
                                                type="button"
                                                onClick={() => void handleDisconnectYouTube()}
                                                disabled={youtubeActionLoading}
                                                className="premium-button-secondary w-full px-3 py-2 text-sm transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <PlayCircle size={16} />
                                                <span>
                                                    {youtubeActionLoading ? "Desconectando..." : "Desconectar YouTube"}
                                                </span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => void handleConnectYouTube()}
                                                disabled={youtubeLoading || youtubeActionLoading}
                                                className="premium-button w-full px-3 py-2 text-sm transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                <PlayCircle size={16} />
                                                <span>
                                                    {youtubeActionLoading
                                                        ? "Redirecionando..."
                                                        : youtubeLoading
                                                            ? "Verificando conexão..."
                                                            : "Conectar YouTube"}
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!youtubeLoading && !youtubeConnected ? (
                            <section className="mb-5 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-white/5 to-cyan-500/10 p-5 text-foreground shadow-lg shadow-black/20">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="max-w-2xl">
                                        <p className="text-xs uppercase tracking-[0.24em] text-amber-200/90 light:text-amber-700">Integração pendente</p>
                                        <h2 className="mt-2 text-xl font-semibold">Conexão com YouTube não concluída</h2>
                                        <p className="mt-2 text-sm leading-6 text-muted">
                                            Você pode navegar normalmente. Conecte o YouTube para habilitar recursos dependentes da conta da plataforma.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => void handleConnectYouTube()}
                                        disabled={youtubeActionLoading}
                                        className="premium-buttonYoutube px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {youtubeActionLoading ? "Redirecionando..." : "Conectar YouTube agora"}
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