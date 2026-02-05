"use client";

import {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
  ThreadHistoryList,
} from "@/components/tambo/thread-history";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/sidebar";

export function TamboSidebar({
  position,
}: {
  position: "left" | "right";
}) {
  return (
    <ThreadHistory position={position}>
      <SidebarProvider defaultOpen>
        <Sidebar side={position} collapsible="icon">
          
          <SidebarHeader>
            <ThreadHistoryHeader />
          </SidebarHeader>

          <SidebarContent>
            <div className="px-2 space-y-2">
              <ThreadHistoryNewButton />
              <ThreadHistorySearch />
            </div>

            <div className="mt-2">
              <ThreadHistoryList />
            </div>
          </SidebarContent>

        </Sidebar>
      </SidebarProvider>
    </ThreadHistory>
  );
}
