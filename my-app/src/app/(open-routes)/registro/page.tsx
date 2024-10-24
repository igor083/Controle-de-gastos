import Button from "@/components/Button_Home/Button"
import './style.scss';
import Image from 'next/image';
export default function registro() {
   return (
      <div className="container">
         
         <div className="logo">
            <a href="/"><Image src={"/Meu Din.svg"}
               alt="Logo Meu Din"
               width={389} 
               height={140} /></a>
         </div>
         <div className="texto-login">
            <h1>Crie sua conta grátis e venha<br /> <span> economizar!</span></h1>
            <p>Crie sua conta inserindo os dados abaixo:</p>
         </div>
         <div className="dados">
            <input type="text" placeholder=" Nome"/>
            <input type="text" placeholder=" Email"/>
            <input type="password" placeholder=" Password" />
            <Button text= {"Crie sua conta!"} href="/"/>//AJEITAR FUNÇÃO
         </div>
         <div className="footer">
            <p>Já possui uma conta?</p>
            <button>Login</button>
         </div>
         
      </div>

   )
}
