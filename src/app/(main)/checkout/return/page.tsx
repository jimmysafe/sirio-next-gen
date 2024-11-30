import { notFound, redirect } from "next/navigation";
import { getCheckoutSession } from "@/modules/checkout/actions";

export default async function Return(props: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const searchParams = await props.searchParams;
  const session_id = searchParams.session_id;
  if (!session_id) redirect("/");

  const session = await getCheckoutSession(session_id);

  if (!session || session.status === "expired") return notFound();

  if (session.status === "open") return redirect("/");

  return (
    <div>
      <p>SUCCESS!</p>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
