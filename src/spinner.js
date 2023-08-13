import { Spinner } from "@material-tailwind/react";
 
export default function SpinnerColors({content}) {
  return (
    <div className="flex gap-8">
      <Spinner color="red" />
      <p className="mr-2">{content}</p>
    </div>
  );
}