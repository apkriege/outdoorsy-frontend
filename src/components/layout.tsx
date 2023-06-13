export default function Layout({ children }: any) {
  return (
    <>
      <div className="navbar border-b border-gray-300">
        <div className="container py-3 px-5">
          <img src="./logoipsum-260.svg" alt="" width={150} height={150} />
        </div>
      </div>
      <div className="bg-gray-100 min-h-screen">{children}</div>
    </>
  );
}
