const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_URL is not defined.");
}

console.log(apiUrl)