import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link
        href={"/cards"}
      >
        Cards
      </Link>
      <Link
        href={"/cards-level-wise"}
      >
        Cards Level Wise
      </Link>
      <Link
        href={"/live-search"}
      >
        Live Search
      </Link>
      <Link
        href={"/virtulization"}
      >
        Virtulization
      </Link>
      <Link
        href={"/infinite-scroll-2"}
      >
        Infinite Scroll
      </Link>
      <Link
        href={"/multi-select-input-with-keyboard-navigation"}
      >
        Multi Select Input with Keyboard Navigation
      </Link>
    </div>
  );
}
