"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export function AboutUsCard({ name, role, description, imageUrl, linkedinUrl, githubUrl }: { name: string; role: string; description: string; imageUrl: string; linkedinUrl: string, githubUrl: string }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-200 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {name}
        </CardItem>
        <CardItem
          translateZ="40"
          className="text-md font-semibold text-neutral-500 dark:text-neutral-300"
        >
          {role}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-72 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={name}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as={Link}
            href={linkedinUrl}
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Linkedin →
          </CardItem>
          <CardItem
            as={Link}
            href={githubUrl}
            translateZ={20}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Github
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
