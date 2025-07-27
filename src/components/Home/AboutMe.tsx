import { CodeEditor } from '@/components/animate-ui/components/code-editor';
import Image from 'next/image';

export default function AboutMe() {
  return (
    <div className="lg:w-2/4 flex lg:justify-start justify-center items-center">
      <CodeEditor
        cursor
        className="xl:min-w-[600px] lg:w-[490px] md:w-4/5 w-full lg:h-[580px] sm:h-[500px] min-[400px]:h-[600px] h-[650px]"
        lang="tsx"
        title="AboutMe.tsx"
        icon={
          <Image
            src={'/react-brands.svg'}
            alt="React component"
            width={15}
            height={15}
          />
        }
        duration={20}
        delay={0.5}
        copyButton
      >
        {`'use client';

import * as React from 'react';

export default function AboutMe () {
  return (
    <div className="w-1/2 h-[100dvh] flex flex-col justify-center gap-2">
      <h3 className="text-2xl">Hi there! I’m Maksym.</h3>
      <h1 className="text-6xl font-bold">Full Stack Developer</h1>
      <p>
        I’m a Full Stack Developer focused on building modern, high-performance, and scalable web applications. I specialize in using Next.js, NestJS, and TypeScript to develop clean, efficient solutions across the entire stack.My approach to development centers around writing maintainable code, designing scalable architectures, and delivering smooth, reliable user experiences. I value simplicity, clarity, and long-term sustainability in every project. I’m constantly learning and staying up to date with the latest tools, best practices,and patterns in modern web development.
      </p>
    </div>
  );
};`}
      </CodeEditor>
    </div>
  );
}
