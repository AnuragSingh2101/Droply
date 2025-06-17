// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { Card, CardBody, CardHeader } from "@heroui/card";
// import { Tabs, Tab } from "@heroui/tabs";
// import { FileUp, FileText, User } from "lucide-react";
// import FileUploadForm from "@/components/FileUploadForm";
// import FileList from "@/components/FileList";
// import UserProfile from "@/components/UserProfile";
// import { useSearchParams } from "next/navigation";

// interface DashboardContentProps {
//   userId: string;
//   userName: string;
//   urlEndpoint?: string;
// }

// export default function DashboardContent({
//   userId,
//   userName,
// }: DashboardContentProps) {
//   const searchParams = useSearchParams();
//   const tabParam = searchParams.get("tab");

//   const [activeTab, setActiveTab] = useState<string>("files");
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [currentFolder, setCurrentFolder] = useState<string | null>(null);

//   // Set the active tab based on URL parameter
//   useEffect(() => {
//     if (tabParam === "profile") {
//       setActiveTab("profile");
//     } else {
//       setActiveTab("files");
//     }
//   }, [tabParam]);

//   const handleFileUploadSuccess = useCallback(() => {
//     setRefreshTrigger((prev) => prev + 1);
//   }, []);

//   const handleFolderChange = useCallback((folderId: string | null) => {
//     setCurrentFolder(folderId);
//   }, []);

//   return (
//     // Add a consistent background color here to avoid white flash on Profile tab
//     <div className="bg-gray-900 min-h-screen px-4 py-6 md:px-8 text-cyan-50">
//       <div className="mb-8">
//         <h2 className="text-4xl font-bold text-cyan-300">
//           Hi,{" "}
//           <span className="text-cyan-400">
//             {userName?.length > 10
//               ? `${userName?.substring(0, 10)}...`
//               : userName?.split(" ")[0] || "there"}
//           </span>
//           !
//         </h2>
//         <p className="text-cyan-400 mt-2 text-lg">
//           Your images are waiting for you.
//         </p>
//       </div>

//       <Tabs
//         aria-label="Dashboard Tabs"
//         color="cyan"
//         variant="unstyled"
//         selectedKey={activeTab}
//         onSelectionChange={(key) => setActiveTab(key as string)}
//         classNames={{
//           tabList: "flex gap-8 border-b-0", 
//           tab: `
//             relative
//             py-3
//             px-1
//             font-semibold
//             text-cyan-300
//             hover:text-cyan-400
//             transition-colors
//             before:absolute
//             before:-bottom-1
//             before:left-0
//             before:right-0
//             before:h-1
//             before:bg-transparent
//             before:rounded-t-md
//             before:transition-colors
//             before:duration-300
//           `,
//         }}
//       >
//         <Tab
//           key="files"
//           title={
//             <div className={`flex items-center gap-2 ${activeTab === "files" ? "text-cyan-400 before:bg-cyan-400" : ""}`}>
//               <FileText className="h-5 w-5" />
//               <span>My Files</span>
//             </div>
//           }
//         >
//           <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-1">
//               <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
//                 <CardHeader className="flex gap-3">
//                   <FileUp className="h-5 w-5 text-cyan-400" />
//                   <h2 className="text-xl font-semibold text-cyan-300">Upload</h2>
//                 </CardHeader>
//                 <CardBody>
//                   <FileUploadForm
//                     userId={userId}
//                     onUploadSuccess={handleFileUploadSuccess}
//                     currentFolder={currentFolder}
//                   />
//                 </CardBody>
//               </Card>
//             </div>

//             <div className="lg:col-span-2">
//               <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
//                 <CardHeader className="flex gap-3">
//                   <FileText className="h-5 w-5 text-cyan-400" />
//                   <h2 className="text-xl font-semibold text-cyan-300">Your Files</h2>
//                 </CardHeader>
//                 <CardBody>
//                   <FileList
//                     userId={userId}
//                     refreshTrigger={refreshTrigger}
//                     onFolderChange={handleFolderChange}
//                   />
//                 </CardBody>
//               </Card>
//             </div>
//           </div>
//         </Tab>

//         <Tab
//           key="profile"
//           title={
//             <div className={`flex items-center gap-2 ${activeTab === "profile" ? "text-cyan-400 before:bg-cyan-400" : ""}`}>
//               <User className="h-5 w-5" />
//               <span>Profile</span>
//             </div>
//           }
//         >
//           <div className="mt-8">
//             <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
//               <CardBody>
//                 <UserProfile />
//               </CardBody>
//             </Card>
//           </div>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// }














// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { Card, CardBody, CardHeader } from "@heroui/card";
// import { Tabs, Tab } from "@heroui/tabs";
// import { FileUp, FileText, User } from "lucide-react";
// import FileUploadForm from "@/components/FileUploadForm";
// import FileList from "@/components/FileList";
// import UserProfile from "@/components/UserProfile";
// import { useSearchParams } from "next/navigation";

// interface DashboardContentProps {
//   userId: string;
//   userName: string;
//   urlEndpoint?: string;
// }

// export default function DashboardContent({
//   userId,
//   userName,
// }: DashboardContentProps) {
//   const searchParams = useSearchParams();
//   const tabParam = searchParams.get("tab");

//   const [activeTab, setActiveTab] = useState<string>("files");
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [currentFolder, setCurrentFolder] = useState<string | null>(null);

//   useEffect(() => {
//     if (tabParam === "profile") {
//       setActiveTab("profile");
//     } else {
//       setActiveTab("files");
//     }
//   }, [tabParam]);

//   const handleFileUploadSuccess = useCallback(() => {
//     setRefreshTrigger((prev) => prev + 1);
//   }, []);

//   const handleFolderChange = useCallback((folderId: string | null) => {
//     setCurrentFolder(folderId);
//   }, []);

//   return (
//     <div className="bg-gray-900 min-h-screen px-4 py-6 md:px-8 text-cyan-50">
//       {/* Welcome Header */}
//       <div className="mb-8">
//         <h2 className="text-4xl font-bold text-cyan-300">
//           Hi,{" "}
//           <span className="text-cyan-400">
//             {userName?.length > 10
//               ? `${userName?.substring(0, 10)}...`
//               : userName?.split(" ")[0] || "there"}
//           </span>
//           !
//         </h2>
//         <p className="text-cyan-400 mt-2 text-lg">
//           Your images are waiting for you.
//         </p>
//       </div>

//       {/* Tabs */}
//       <Tabs
//         aria-label="Dashboard Tabs"
//         color="cyan"
//         variant="unstyled"
//         selectedKey={activeTab}
//         onSelectionChange={(key) => setActiveTab(key as string)}
//         classNames={{
//           tabList: "flex gap-4",
//           tab: `
//             py-2 px-4
//             text-cyan-300
//             font-medium
//             rounded-md
//             transition-all
//             border border-transparent
//             hover:border-cyan-600
//             hover:shadow-md
//             hover:text-cyan-400
//             ease-in-out duration-200
//           `,
//         }}
//       >
//         {/* My Files Tab */}
//         <Tab
//           key="files"
//           title={
//             <div
//               className={`flex items-center gap-2 ${
//                 activeTab === "files"
//                   ? "border border-cyan-500 bg-gray-800 text-cyan-400 shadow-md"
//                   : ""
//               } px-3 py-2 rounded-md transition-all`}
//             >
//               <FileText className="h-5 w-5" />
//               <span>My Files</span>
//             </div>
//           }
//         >
//           <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Upload Card */}
//             <div className="lg:col-span-1">
//               <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
//                 <CardHeader className="flex gap-3">
//                   <FileUp className="h-5 w-5 text-cyan-400" />
//                   <h2 className="text-xl font-semibold text-cyan-300">
//                     Upload
//                   </h2>
//                 </CardHeader>
//                 <CardBody>
//                   <FileUploadForm
//                     userId={userId}
//                     onUploadSuccess={handleFileUploadSuccess}
//                     currentFolder={currentFolder}
//                   />
//                 </CardBody>
//               </Card>
//             </div>

//             {/* File List */}
//             <div className="lg:col-span-2">
//               <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
//                 <CardHeader className="flex gap-3">
//                   <FileText className="h-5 w-5 text-cyan-400" />
//                   <h2 className="text-xl font-semibold text-cyan-300">
//                     Your Files
//                   </h2>
//                 </CardHeader>
//                 <CardBody>
//                   <FileList
//                     userId={userId}
//                     refreshTrigger={refreshTrigger}
//                     onFolderChange={handleFolderChange}
//                   />
//                 </CardBody>
//               </Card>
//             </div>
//           </div>
//         </Tab>

//         {/* Profile Tab */}
//         <Tab
//           key="profile"
//           title={
//             <div
//               className={`flex items-center gap-2 ${
//                 activeTab === "profile"
//                   ? "border border-cyan-500 bg-gray-800 text-cyan-400 shadow-md"
//                   : ""
//               } px-3 py-2 rounded-md transition-all`}
//             >
//               <User className="h-5 w-5" />
//               <span>Profile</span>
//             </div>
//           }
//         >
//           <div className="mt-8">
//             <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
//               <CardBody>
//                 <UserProfile />
//               </CardBody>
//             </Card>
//           </div>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// }











"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { FileUp, FileText, User } from "lucide-react";
import FileUploadForm from "@/components/FileUploadForm";
import FileList from "@/components/FileList";
import UserProfile from "@/components/UserProfile";
import { useSearchParams } from "next/navigation";

interface DashboardContentProps {
  userId: string;
  userName: string;
  urlEndpoint?: string;
}

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  const renderTabTitle = (key: string, icon: React.ReactNode, label: string) => (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
        activeTab === key
          ? "border border-cyan-500 bg-gray-800 text-cyan-400 shadow-md"
          : "text-cyan-300 hover:text-cyan-400"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen px-4 py-6 md:px-8 text-cyan-50">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-cyan-300">
          Hi,{" "}
          <span className="text-cyan-400">
            {userName && userName.length > 10
              ? `${userName.substring(0, 10)}...`
              : userName?.split(" ")[0] || "there"}
          </span>
          !
        </h2>
        <p className="text-cyan-400 mt-2 text-lg">
          Your images are waiting for you.
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        aria-label="Dashboard Tabs"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(String(key))}
        className="w-full"
      >
        {/* My Files Tab */}
        <Tab
          key="files"
          title={renderTabTitle(
            "files",
            <FileText className="h-5 w-5" />,
            "My Files"
          )}
        >
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Card */}
            <div className="lg:col-span-1">
              <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex gap-3">
                  <FileUp className="h-5 w-5 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-cyan-300">
                    Upload
                  </h2>
                </CardHeader>
                <CardBody>
                  <FileUploadForm
                    userId={userId}
                    onUploadSuccess={handleFileUploadSuccess}
                    currentFolder={currentFolder}
                  />
                </CardBody>
              </Card>
            </div>

            {/* File List */}
            <div className="lg:col-span-2">
              <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex gap-3">
                  <FileText className="h-5 w-5 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-cyan-300">
                    Your Files
                  </h2>
                </CardHeader>
                <CardBody>
                  <FileList
                    userId={userId}
                    refreshTrigger={refreshTrigger}
                    onFolderChange={handleFolderChange}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        {/* Profile Tab */}
        <Tab
          key="profile"
          title={renderTabTitle(
            "profile",
            <User className="h-5 w-5" />,
            "Profile"
          )}
        >
          <div className="mt-8">
            <Card className="border border-cyan-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <CardBody>
                <UserProfile />
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}