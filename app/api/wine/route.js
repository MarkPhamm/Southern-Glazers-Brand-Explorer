import { supabase } from '../../utils/supabase/supabase';

const findBestMatchedWine = (wines, userInput) => {
  const { sweetnessLevel, bitternessLevel, alPercentage, acidityLevel, tanninLevel, mouthFeel, finish } = userInput;

  let bestMatch = null;
  let bestScore = -1;

  wines.forEach((wine) => {
    let score = 0;

    // Calculate score based on user inputs
    score += 10 - Math.abs(wine.sweetness_level - sweetnessLevel);
    score += 10 - Math.abs(wine.bitterness_level - bitternessLevel);
    score += 10 - Math.abs(wine.acidity_level - acidityLevel);
    score += 10 - Math.abs(wine.tannin_level - tanninLevel);

    // Bonus points for matching categorical fields
    if (wine.mouthfeel === mouthFeel) score += 5;
    if (wine.finish === finish) score += 5;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = wine;
    }
  });

  return bestMatch;
};

// POST method: Handles wine recommendation
export async function POST(request) {
  try {
    const userInput = await request.json();
    console.log(userInput)

    // Fetch wines from Supabase
    const { data: wines, error } = await supabase.from('products').select('*');
    if (error) throw error;

    // Find the best-matched wine
    const bestWine = findBestMatchedWine(wines, userInput);
    console.log(bestWine)

    return new Response(JSON.stringify({ bestWine }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process the request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Optional: Handle other HTTP methods
export function GET() {
  return new Response(
    JSON.stringify({ message: 'This endpoint supports only POST requests.' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}