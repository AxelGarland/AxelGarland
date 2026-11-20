import { WorkList } from "@/components/home/WorkList";

/** The bottom of every case study: the other projects as the same list the home page has, with a preview
 *  that follows the pointer. Starts with the project after this one. */
export function MoreProjects({ current }: { current: string }) {
  return <WorkList current={current} />;
}
