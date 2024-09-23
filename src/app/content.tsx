import { BrowseByCategory, HeroCarousel, MidNav } from "./comp";
export const MainContent = () => {
  return (
    <main className="h-screen w-full">
      <div className="flex h-2/3 w-full items-center bg-gradient-to-b from-slate-900 via-cyan-950 to-gray-900 py-6">
        <HeroCarousel />
      </div>
      <MidNav />
      <div className="h-4 bg-gradient-to-r from-board/50 via-white to-board/50" />

      <BrowseByCategory />
      <div className="h-w-full bg-rose-100 p-12">
        <div className="h-full w-full border"></div>
      </div>
      <div className="h-[50rem] w-full bg-orange-300 p-16">
        <div className="h-full w-full border"></div>
      </div>
    </main>
  );
};
