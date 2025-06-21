import { Card } from "../../components/ui/card";

export default function Category() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Category Page</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <p className="text-muted-foreground">
          This is the category page content. Navigate back to Home using the
          sidebar.
        </p>
      </Card>
    </div>
  );
}
