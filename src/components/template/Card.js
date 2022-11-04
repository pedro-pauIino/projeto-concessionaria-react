import './Card.css';

export default function Cards ({nome,ra,codCurso,img}){
    return(      
            
            <div className='card'>
                <div className='img'>
                   <img src={img}/> 
                </div>
                <div className='ra'>
                    {ra}
                </div>
                <div className='nome'>
                    {nome}
                </div>
                <div className='codCurso'>
                    Curso: {codCurso}
                </div>
                <p></p>
            </div>     
      
    )
}