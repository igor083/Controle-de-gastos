import Image from "next/image";
const BigLogo: React.FC = () => {
   return (
      <a href="/"><Image src={"/Meu Din.svg"}
         alt="Logo Meu Din"
         width={389}
         height={140} /></a>
   );
};

export default BigLogo;
