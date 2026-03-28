import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
            <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />

                {/* Animated logo/spinner */}
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="relative w-16 h-16 border-4 border-primary border-t-transparent rounded-full shadow-[0_0_20px_rgba(75,229,245,0.4)]"
                />

                {/* Inner static dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full shadow-glow animate-pulse" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-2"
            >
                <span className="text-xl font-heading font-bold tracking-tighter text-foreground">
                    Event<span className="text-primary italic">Orbit</span>
                </span>
                <div className="flex gap-1.5">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 1] }}
                        className="w-1.5 h-1.5 bg-primary/60 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2, times: [0, 0.5, 1] }}
                        className="w-1.5 h-1.5 bg-primary/40 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4, times: [0, 0.5, 1] }}
                        className="w-1.5 h-1.5 bg-primary/20 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
}
