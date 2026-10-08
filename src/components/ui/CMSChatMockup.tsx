import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CMSChatMockupProps {
  className?: string;
  startAnimation?: boolean;
}

type ChatStep = "message" | "contact" | "email" | "reply";

const messages = {
  user: "Hello, connect me with an agent",
  bot: "Give the team a way to reach you.",
  email: "Get notified by email",
  reply: "Thanks! Our team will get back to you shortly.",
};

export function CMSChatMockup({
  className = "",
  startAnimation = true,
}: CMSChatMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState<ChatStep>("message");

  const active = startAnimation && isInView;

  useEffect(() => {
    if (!active || reduceMotion) {
      if (reduceMotion) setStep("reply");
      return;
    }

    let timer = 0;

    const loop = () => {
      setStep("message");
      timer = window.setTimeout(() => {
        setStep("contact");
        timer = window.setTimeout(() => {
          setStep("email");
          timer = window.setTimeout(() => {
            setStep("reply");
            timer = window.setTimeout(loop, 2600);
          }, 2200);
        }, 1700);
      }, 1600);
    };

    loop();
    return () => window.clearTimeout(timer);
  }, [active, reduceMotion]);

  const showUser = true;
  const showContact = ["contact", "email", "reply"].includes(step);
  const showEmail = ["email", "reply"].includes(step);
  const showReply = step === "reply";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -35, y: 24, scale: 0.9 }}
      animate={
        active
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: -35, y: 24, scale: 0.9 }
      }
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute bottom-[4%] left-10 z-30 hidden w-[250px] -translate-x-[8%] lg:block xl:w-[280px] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[24px] border border-white/90 bg-white shadow-[0_22px_65px_rgba(15,23,42,0.16)]">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
          <motion.div
            animate={active ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#101a35] text-[10px] font-bold text-white"
          >
            R
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[#111a33]">RateBotAI-CMS</p>
            <p className="mt-0.5 text-[8px] text-slate-400">Typically replies in a few minutes</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-[#72b38a]" />
        </div>

        <div className="relative h-[270px] overflow-hidden bg-[#f8f9fb] px-3.5 py-4">
          <div className="mb-4 flex items-center justify-center">
            <span className="text-[9px] font-medium text-slate-400">Oct 08, 2026</span>
          </div>

          <motion.div
            animate={showUser ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto w-fit max-w-[88%] rounded-[16px] rounded-br-[5px] bg-[#10171b] px-3.5 py-2.5 text-[10px] leading-4 text-white shadow-[0_5px_15px_rgba(15,23,42,0.08)]"
          >
            {messages.user}
          </motion.div>

          <motion.div
            animate={showContact ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 flex items-start gap-2"
          >
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4aa3ff] text-[7px] font-bold text-white">R</div>
            <div className="max-w-[86%] rounded-[16px] rounded-tl-[5px] bg-white px-3.5 py-2.5 text-[10px] leading-4 text-slate-600 shadow-[0_5px_18px_rgba(15,23,42,0.07)]">
              {messages.bot}
            </div>
          </motion.div>

          <motion.div
            animate={showEmail ? { opacity: 1, y: 0, height: "auto" } : { opacity: 0, y: 12, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="ml-7 mt-2.5 overflow-hidden"
          >
            <div className="rounded-[17px] bg-white p-3 shadow-[0_6px_20px_rgba(15,23,42,0.07)]">
              <p className="text-[10px] font-medium text-slate-600">{messages.email}</p>
              <div className="mt-2 flex overflow-hidden rounded-[10px] border border-slate-200 bg-white">
                <span className="min-w-0 flex-1 px-2.5 py-2 text-[9px] text-slate-400">Please enter your email</span>
                <div className="flex w-8 shrink-0 items-center justify-center bg-[#909294] text-white">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                    <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={showReply ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2.5 flex items-start gap-2"
          >
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4aa3ff] text-[7px] font-bold text-white">R</div>
            <div className="max-w-[86%] rounded-[16px] rounded-tl-[5px] bg-white px-3.5 py-2.5 text-[10px] leading-4 text-slate-600 shadow-[0_5px_18px_rgba(15,23,42,0.07)]">
              {messages.reply}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-slate-100 bg-white p-3">
          <motion.div
            animate={active && !reduceMotion ? { y: [0, -1, 0] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 items-center justify-center rounded-[10px] bg-[#10171b] text-[10px] font-semibold text-white"
          >
            Start a new conversation
          </motion.div>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-[2px] border-slate-400" />
            <span className="text-[8px] font-medium text-slate-400">Powered by RateBotAI</span>
          </div>
        </div>
      </div>

      <motion.div
        animate={active && !reduceMotion ? { opacity: [0.15, 0.3, 0.15], scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-5 -left-5 -z-10 h-24 w-24 rounded-full bg-[#79a9df]/20 blur-2xl"
      />
    </motion.div>
  );
}

export default CMSChatMockup;
