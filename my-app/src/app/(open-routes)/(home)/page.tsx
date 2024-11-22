// src/app/page.tsx ou src/pages/index.tsx (dependendo da sua estrutura)

import './style.scss';
import Image from 'next/image';
import Button from '../../../components/Button_Home/Button'; 
import BigLogo from '../../../components/BigLogo/BigLogo'; 

export default function Home() {
   return (
     <div className="container">
         <div className="welcome">
            <div><BigLogo/></div>
            
               <div className='flex'>
                  <p>Bem vindo ao <br /><span >Meu Din$</span>!</p>
                  <Image src={"/moedas.png"}
         alt="Moedinhas"
         width={81}
         height={70} />
               </div>
            
         </div>

         <div className='text1'>
            <p>Transforme a maneira como você gerencia suas finanças. Com nossa plataforma intuitiva de controle de gastos.Alcançar seus objetivos financeiros nunca foi tão fácil. </p>
         </div>
         <div className="mid-text">
            <p><b>Simplifique</b> sua vida e tome decisões mais <br /><b>inteligentes</b> para o futuro</p>
         
            <p><b>Crie sua conta <span>grátis</span> e <br /> venha <span>economizar!</span></b> </p>
         </div>
         <div className='buttons'>
            <Button text={'Faça Login'} href='/login'/>
            <Button text={'Crie sua conta'} href='/registro'/>
         </div>
         <div className='mention'>
            <p>"Se você almeja ser rico, pense em poupar assim como você pensa em ganhar dinheiro. <br />
            - Benjamin Franklin"</p>
         </div>
     </div>
   );
 }