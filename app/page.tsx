// import { Button } from "@heroui/button";
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";
// import { Card, CardBody } from "@heroui/card";
// import {
//   CloudUpload,
//   Shield,
//   Folder,
//   Image as ImageIcon,
//   ArrowRight,
// } from "lucide-react";
// import Navbar from "@/components/Navbar";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col bg-default-50">
//       <Navbar />

//       {/* Main content */}
//       <main className="flex-1">
//         {/* Hero section */}
//         <section className="py-12 md:py-20 px-4 md:px-6">
//           <div className="container mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
//               <div className="space-y-6 text-center lg:text-left">
//                 <div>
//                   <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-default-900 leading-tight">
//                     Store your <span className="text-primary">images</span> with
//                     ease
//                   </h1>
//                   <p className="text-lg md:text-xl text-default-600">
//                     Simple. Secure. Fast.
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
//                   <SignedOut>
//                     <Link href="/sign-up">
//                       <Button size="lg" variant="solid" color="primary">
//                         Get Started
//                       </Button>
//                     </Link>
//                     <Link href="/sign-in">
//                       <Button size="lg" variant="flat" color="primary">
//                         Sign In
//                       </Button>
//                     </Link>
//                   </SignedOut>
//                   <SignedIn>
//                     <Link href="/dashboard">
//                       <Button
//                         size="lg"
//                         variant="solid"
//                         color="primary"
//                         endContent={<ArrowRight className="h-4 w-4" />}
//                       >
//                         Go to Dashboard
//                       </Button>
//                     </Link>
//                   </SignedIn>
//                 </div>
//               </div>

//               <div className="flex justify-center order-first lg:order-last">
//                 <div className="relative w-64 h-64 md:w-80 md:h-80">
//                   <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <ImageIcon className="h-24 md:h-32 w-24 md:w-32 text-primary/70" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features section */}
//         <section className="py-12 md:py-16 px-4 md:px-6 bg-default-50">
//           <div className="container mx-auto">
//             <div className="text-center mb-8 md:mb-12">
//               <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
//                 What You Get
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//               <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
//                 <CardBody className="p-6 text-center">
//                   <CloudUpload className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
//                   <h3 className="text-lg md:text-xl font-semibold mb-2 text-default-900">
//                     Quick Uploads
//                   </h3>
//                   <p className="text-default-600">Drag, drop, done.</p>
//                 </CardBody>
//               </Card>

//               <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow">
//                 <CardBody className="p-6 text-center">
//                   <Folder className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
//                   <h3 className="text-lg md:text-xl font-semibold mb-2 text-default-900">
//                     Smart Organization
//                   </h3>
//                   <p className="text-default-600">
//                     Keep it tidy, find it fast.
//                   </p>
//                 </CardBody>
//               </Card>

//               <Card className="border border-default-200 bg-default-50 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-full">
//                 <CardBody className="p-6 text-center">
//                   <Shield className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-primary" />
//                   <h3 className="text-lg md:text-xl font-semibold mb-2 text-default-900">
//                     Locked Down
//                   </h3>
//                   <p className="text-default-600">
//                     Your images, your eyes only.
//                   </p>
//                 </CardBody>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* CTA section */}
//         <section className="py-12 md:py-20 px-4 md:px-6 bg-default-50">
//           <div className="container mx-auto text-center">
//             <h2 className="text-2xl md:text-3xl font-bold mb-4 text-default-900">
//               Ready?
//             </h2>
//             <SignedOut>
//               <div className="flex flex-wrap justify-center gap-4 mt-8">
//                 <Link href="/sign-up">
//                   <Button
//                     size="lg"
//                     variant="solid"
//                     color="primary"
//                     endContent={<ArrowRight className="h-4 w-4" />}
//                   >
//                     Let's Go
//                   </Button>
//                 </Link>
//               </div>
//             </SignedOut>
//             <SignedIn>
//               <Link href="/dashboard">
//                 <Button
//                   size="lg"
//                   variant="solid"
//                   color="primary"
//                   endContent={<ArrowRight className="h-4 w-4" />}
//                 >
//                   Dashboard
//                 </Button>
//               </Link>
//             </SignedIn>
//           </div>
//         </section>
//       </main>

//       {/* footer */}
//       <footer className="bg-default-50 border-t border-default-200 py-4 md:py-6">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-2 mb-4 md:mb-0">
//               <CloudUpload className="h-5 w-5 text-primary" />
//               <h2 className="text-lg font-bold">Droply</h2>
//             </div>
//             <p className="text-default-500 text-sm">
//               &copy; {new Date().getFullYear()} Droply
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                    Store your <span className="text-cyan-400">Images</span>{" "}
                    with ease
                  </h1>
                  <p className="text-lg md:text-xl text-gray-400">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="text-cyan-400 flex flex-wrap gap-4 pt-4 justify-center lg:justify-start font-semibold">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        variant="solid"
                        className="border border-cyan-500 rounded-xl transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300"
                      >
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button
                        size="lg"
                        variant="flat"
                        className="border border-cyan-500 text-cyan-300 rounded-xl transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>

                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="solid"
                        className="border border-cyan-500 rounded-xl transition duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-300"
                        endContent={<ArrowRight className="h-4 w-4" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-cyan-600/20 rounded-full blur-3xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-24 md:h-32 w-24 md:w-32 text-cyan-400/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-800">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                What You Get
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="border border-gray-700 bg-gray-900 shadow-md hover:shadow-cyan-600 transition-shadow">
                <CardBody className="p-6 text-center">
                  <CloudUpload className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                    Quick Uploads
                  </h3>
                  <p className="text-gray-400">Drag, drop, done.</p>
                </CardBody>
              </Card>

              <Card className="border border-gray-700 bg-gray-900 shadow-md hover:shadow-cyan-600 transition-shadow">
                <CardBody className="p-6 text-center">
                  <Folder className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                    Smart Organization
                  </h3>
                  <p className="text-gray-400">Keep it tidy, find it fast.</p>
                </CardBody>
              </Card>

              <Card className="border border-gray-700 bg-gray-900 shadow-md hover:shadow-cyan-600 transition-shadow sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-full">
                <CardBody className="p-6 text-center">
                  <Shield className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                    Locked Down
                  </h3>
                  <p className="text-gray-400">Your images, your eyes only.</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-900">
  <div className="container mx-auto text-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
      Ready?
    </h2>
    <SignedOut>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link href="/sign-up">
          <Button
            size="lg"
            variant="solid"
            className="bg-cyan-600 border-2 border-cyan-500 text-white rounded-xl shadow-md"
            endContent={<ArrowRight className="h-4 w-4 text-white" />}
          >
            Let's Go
          </Button>
        </Link>
      </div>
    </SignedOut>
    <SignedIn>
      <Link href="/dashboard">
        <Button
          size="lg"
          variant="solid"
          className="bg-cyan-600 border-2 border-cyan-500 text-white rounded-xl shadow-md"
          endContent={<ArrowRight className="h-4 w-4 text-white" />}
        >
          Dashboard
        </Button>
      </Link>
    </SignedIn>
  </div>
</section>

    </main>



      {/* footer */}
      <footer className="bg-gray-900 border-t border-cyan-700 py-4 md:py-6">
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <CloudUpload className="h-5 w-5 text-cyan-400" />
        <h2 className="text-lg font-bold text-cyan-400">Droply</h2>
      </div>
      <p className="text-cyan-300 text-sm select-none">
        &copy; {new Date().getFullYear()} 
      </p>
    </div>
  </div>
</footer>


    </div>
  );
}
