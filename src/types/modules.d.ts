// declare module '@/components/ShareButtons' {
//   import { ReactElement } from 'react';
//   const ShareButtons: () => ReactElement;
//   export default ShareButtons;
// }


declare module '@/components/Breadcrumbs' {
  import { ReactElement } from 'react';
  
  interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
  }

  const Breadcrumbs: (props: BreadcrumbsProps) => ReactElement;
  export default Breadcrumbs;
}