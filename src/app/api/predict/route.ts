import { NextResponse } from 'next/server';

// 定义分析维度
const dimensions = {
  personality: {
    title: '性格匹配',
    descriptions: [
      '你们的性格特征展现出很好的互补性，这种互补将有助于建立稳定和谐的关系。',
      '你们的性格有一定差异，这可能会带来一些挑战，但也为关系增添了趣味性。',
      '你们的性格特征较为相似，这有助于相互理解，但也需要注意可能的固化思维。'
    ]
  },
  values: {
    title: '价值观契合',
    descriptions: [
      '在人生价值观和未来规划上，你们表现出高度的一致性，这为长期关系奠定了良好基础。',
      '你们在某些价值观念上存在差异，这需要通过有效沟通来达成共识。',
      '你们的价值观念有较大差异，这可能需要双方更多的包容和理解。'
    ]
  },
  lifestyle: {
    title: '生活方式',
    descriptions: [
      '你们的生活习惯和兴趣爱好较为契合，这有助于建立和谐的共同生活。',
      '你们的生活方式有一些不同，但这些差异是可以通过调整来��调的。',
      '你们的生活方式差异较大，这需要双方做出一定的妥协和适应。'
    ]
  },
  communication: {
    title: '沟通模式',
    descriptions: [
      '你们的沟通方式非常协调，这将有助于解决生活中的各种问题。',
      '你们的沟通模式需要一些调整，但总体来说是积极的。',
      '你们在沟通方式上存在一些障碍，需要双方共同努力改善。'
    ]
  }
};

// 基于姓名生成随机但稳定的分数
function generateScore(name1: string, name2: string) {
  const combinedName = name1 + name2;
  let hash = 0;
  for (let i = 0; i < combinedName.length; i++) {
    hash = ((hash << 5) - hash) + combinedName.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 30) + 70; // 70-99之间的分数
}

// 根据分数选择描述
function getDescriptionByScore(score: number, descriptions: string[]) {
  if (score >= 90) return descriptions[0];
  if (score >= 80) return descriptions[1];
  return descriptions[2];
}

export async function POST(request: Request) {
  try {
    const { name1, name2 } = await request.json();

    if (!name1 || !name2) {
      return NextResponse.json(
        { error: '请输入双方姓名' },
        { status: 400 }
      );
    }

    // 生成总体匹配分数
    const score = generateScore(name1, name2);

    // 生成各维度的分析结果
    const details = Object.entries(dimensions).map(([key, dim]) => ({
      title: dim.title,
      text: getDescriptionByScore(score, dim.descriptions)
    }));

    // 生成整体描述
    const description = `基于对${name1}和${name2}的深入分析，你们的婚姻契合度为${score}分。${
      score >= 90 ? '这是一个非常理想的匹配！' :
      score >= 80 ? '这是一个不错的匹配。' :
      '这个匹配存在一些需要注意的地方。'
    }`;

    return NextResponse.json({
      score,
      description,
      details
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: '分析过程中出现错误' },
      { status: 500 }
    );
  }
} 