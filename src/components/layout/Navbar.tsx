import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { nav } from '@/data/siteData';
import { useTheme } from '@/hooks/useTheme';
import { AnchorButton } from '@/components/ui/Button';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="RateBotAI home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 text-white dark:bg-white dark:text-navy-900">
        <span className="text-lg font-extrabold leading-none">R</span>
      </span>
      <span className="text-[1.05rem] font-bold tracking-tight text-navy-900 dark:text-white">
        RateBot<span className="text-navy-400 dark:text-navy-300">AI</span>
      </span>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-navy-700 transition-colors hover:bg-navy-50 dark:text-navy-200 dark:hover:bg-navy-800"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'border-b border-canvas-line bg-canvas/80 backdrop-blur-xl dark:border-navy-700 dark:bg-navy-900/80'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            className={`container-px flex items-center justify-between transition-all duration-300 ${
              scrolled ? 'h-16' : 'h-20'
            }`}
            aria-label="Primary"
          >
            <Logo />

            <div className="hidden items-center gap-1 lg:flex">
              {nav.main.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden sm:block">
                <AnchorButton href={nav.actions[0].href} size="sm">
                  {nav.actions[0].label}
                </AnchorButton>
              </div>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-navy-800 transition-colors hover:bg-navy-50 dark:text-white dark:hover:bg-navy-800 lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-navy-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-px flex h-20 items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
              className="container-px mt-6 flex flex-col gap-2"
            >
              {nav.main.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                  className="border-b border-white/10 py-5 text-2xl font-semibold text-white"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <AnchorButton href={nav.actions[0].href} size="lg" className="w-full">
                  {nav.actions[0].label}
                </AnchorButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
