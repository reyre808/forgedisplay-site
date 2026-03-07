export async function POST(req: Request) {
  const data = await req.formData();

  const name = data.get("name");
  const email = data.get("email");
  const standType = data.get("standType");
  const color = data.get("color");
  const notes = data.get("notes");

  console.log("NEW ORDER");
  console.log({
    name,
    email,
    standType,
    color,
    notes,
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}