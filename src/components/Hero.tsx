'use client';

import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#0f0f2c]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute right-[-15%] top-[-15%] h-[70%] w-[70%] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-3xl" />

                <div className="absolute left-[10%] bottom-[20%] h-64 w-64 rounded-full bg-blue-700/10 blur-3xl" />
                <div className="absolute right-[25%] bottom-[10%] h-40 w-40 rounded-full bg-purple-700/10 blur-3xl" />

                <svg
                    className="absolute bottom-0 left-0 w-full opacity-10"
                    height="200"
                    viewBox="0 0 1440 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                        d="M0,160 C320,220 420,140 640,160 C880,180 1040,120 1200,160 C1320,190 1400,150 1440,160 L1440,200 L0,200 Z"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Free Next.js + Tailwind CSS{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Template for Startup & SaaS
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl"
                    >
                        Startup is free Next.js template for startups and SaaS business websites comes
                        with all the essential pages, components, and sections you need to launch a
                        complete business website, built with Next 13.x and Tailwind CSS.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Button size="large" className="bg-blue-600 hover:bg-blue-700">
                            Download Now
                        </Button>
                        <Button size="large" variant="outlined" className="border-gray-700 hover:bg-gray-800">
                            Star on GitHub
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}