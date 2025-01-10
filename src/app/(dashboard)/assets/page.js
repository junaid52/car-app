import { AssetsProvider } from "@/context/assets-context";
import AssetsSidebar from "./components/assets-sidebar";
import AssetsBanner from "./components/assets-banner";
import AssetNotes from "./components/asset-notes";
import AvailableAssets from "./components/available-assets";
export default function Page() {
  return (
    <div className="flex gap-4">
      <AssetsProvider>
        <AssetsSidebar />
        <div className="flex-1">
          <AssetsBanner />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <AssetNotes />
            <AvailableAssets />
          </div>
        </div>
      </AssetsProvider>
    </div>
  );
}
