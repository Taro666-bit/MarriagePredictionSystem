'use client';

import { motion } from "framer-motion";

export function Cases() {
  const cases = [
    {
      names: "张先生 & 李女士",
      rating: 5,
      comment: "通过测试让我们更好地了解彼此，发现了很多以前没注意到的契合点。",
      matchRate: "85%",
      tags: ["性格互补", "价值观一致", "沟通模式匹配"]
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
          成功案例
        </motion.h2>
        <motion.p 
          className="text-neutral"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          看看其他用户是如何通过我们的测试服务改善他们的关系
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((item, index) => (
          <motion.div
            key={item.names}
            className="p-6 rounded-xl bg-background border border-neutral/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {item.names}
            </h3>
            <p className="text-neutral mb-4">
              {item.comment}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 