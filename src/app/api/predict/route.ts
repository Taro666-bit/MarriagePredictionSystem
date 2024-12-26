import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name1, name2 } = await request.json();

    if (!name1 || !name2) {
      return NextResponse.json(
        { error: '请输入双方姓名' },
        { status: 400 }
      );
    }

    // 生成基础分数 (范围0-10)
    function generateBaseScore(name: string): number {
      const seed = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (seed % 6) + 5; // 生成5-10的稳定分数
    }

    // 生成总分
    const totalScore = Math.floor(generateBaseScore(name1 + name2) * 10);

    // 构建响应数据
    const response = {
      score: totalScore,
      name1,
      name2,
      description: `基于${name1}和${name2}的深入分析，你们的婚姻契合度为${totalScore}分。`,
      basic: {
        total: Math.floor(generateBaseScore(name1 + name2) * 10),
        personality: {
          total: Math.floor(generateBaseScore(name1 + 'personality') * 10)
        },
        lifestyle: {
          total: Math.floor(generateBaseScore(name2 + 'lifestyle') * 10)
        }
      },
      values: {
        total: Math.floor(generateBaseScore(name1 + name2 + 'values') * 10),
        lifeValues: {
          total: Math.floor(generateBaseScore(name1 + 'lifeValues') * 10)
        },
        financialValues: {
          total: Math.floor(generateBaseScore(name2 + 'financialValues') * 10)
        }
      },
      emotional: {
        total: Math.floor(generateBaseScore(name1 + name2 + 'emotional') * 10),
        communication: {
          total: Math.floor(generateBaseScore(name1 + 'communication') * 10)
        },
        empathy: {
          total: Math.floor(generateBaseScore(name2 + 'empathy') * 10)
        }
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: '分析过程中出现错误，请稍后重试' },
      { status: 500 }
    );
  }
} 