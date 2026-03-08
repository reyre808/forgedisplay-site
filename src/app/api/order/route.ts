export async function POST(req: Request) {
  const data = await req.json();

  console.log("NEW FORGEDISPLAY ORDER REQUEST");
  console.log(data);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}