import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { capturePageView } from "@/lib/analytics";

const PostHogPageView = () => {
  const location = useLocation();

  useEffect(() => {
    capturePageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
};

export default PostHogPageView;
