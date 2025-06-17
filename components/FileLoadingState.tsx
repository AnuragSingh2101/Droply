// "use client";

// import { Spinner } from "@heroui/spinner";

// export default function FileLoadingState() {
//   return (
//     <div className="flex flex-col items-center justify-center py-24 px-4 bg-transparent">
//       <div className="animate-pulse">
//         <Spinner size="lg" className="text-cyan-400" />
//       </div>
//       <p className="mt-6 text-lg font-medium text-cyan-300 tracking-wide">
//         Loading your files...
//       </p>
//       <p className="text-sm text-cyan-500 mt-1">
//         Just a moment, we’re fetching everything for you.
//       </p>
//     </div>
//   );
// }






export default function FileLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      <p className="mt-6 text-lg font-medium text-cyan-300 tracking-wide">
        Loading your files...
      </p>
      <p className="text-sm text-cyan-500 mt-1">
        Just a moment, we’re fetching everything for you.
      </p>
    </div>
  );
}
