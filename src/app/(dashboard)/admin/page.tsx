import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


const adminPage = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (session?.user) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <h1 className=" text-6xl"> Welcome to  </h1>
        <h2 className="text-4xl"> Admin page {session?.user.username}</h2>
      </div>
    )

  }
  return (
    <h2 className="tex=xl">
      Please log in to see this page
    </h2>
  );
};

export default adminPage;