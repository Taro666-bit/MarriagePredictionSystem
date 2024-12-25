'use client';

import { motion } from "framer-motion";

export function Experts() {
  const experts = [
    {
      name: "张教授",
      title: "心理学博士",
      org: "北京大学心理学系",
      desc: "专注婚姻心理研究20年，发表论文30余篇",
      field: "婚姻心理情感咨询人格心理学"
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          专家团队
        </motion.h2>
        <motion.p 
          className="text-neutral"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          由资深心理学专家和婚姻咨询师组成的专业团队，为您提供权威的理论支持
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experts.map((expert, index) => (
          <motion.div
            key={expert.name}
            className="p-6 rounded-xl bg-background border border-neutral/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {expert.name}
            </h3>
            <p className="text-primary mb-2">{expert.title}</p>
            <p className="text-neutral mb-2">{expert.org}</p>
            <p className="text-neutral">{expert.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 