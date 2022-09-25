import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { CodesandboxLogo } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';  // o type é ou uma string 'paragraph' ou 'link'
  content: string;
}

interface PostProps {
  author:  Author;
  publishedAt: Date;
  content: Content[];
}

// Formata a data usando a biblioteca date-fns
export function Post({ author, publishedAt, content }: PostProps) { 
  // Avisa o react sempre que fizermos uma alteração na variável comment para que dessa forma a alteração seja refletida
  // em tela
  const [comments, setComments] = useState([
    'Post muito bacana'
  ]);

  // É importante sempre inicializarmos o estado com uma informação do mesmo tipo que vamos armazenar posteriormente
  // No caso abaixo como vamos inserir texto então inicializamos com: ''
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  // Armazena a data de publicação do post relativa a data atual
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,    // traduz a data
    addSuffix: true, // Adiciona o prefixo "há"
  })

  // Quando a função é disparada pela ação do usuário geralmente iniciamos o nome dela com 'handle'
  function handleCreateNewComment(event: FormEvent) {
    // Retira o comportamento padrão do form que é redirecionar o usuário para outra pagina após fazer submit
    event.preventDefault();

    // event.target sempre retorna o elemento que esta recebendo o evento
    // podemos selecionar um elemento de dentro do form pelo nome, id, ou input
    // para pegar o valor da textarea adicionamos o 'value' no final, assim conseguimos pegar o que o usuário digitou
    //const newCommentText = event.target.comment.value;

    // Passa para a função o novo valor da variável comments para que o react saiba que uma alteração foi feita
    setComments([...comments, newCommentText]);
    setNewCommentText('');
    // limpa a textarea 
    // obs: não usar dessa forma
    //event.target.comment.value ? '' : ;
  }

  // Monitora se é digitado algo dentro da textarea
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    // Define uma string vazia para indicar que o usuário digitou algo e já pode publicar a mensagem
    event.target.setCustomValidity('');

    setNewCommentText(event.target.value);
  }

  // Mostra uma mensagem caso o usuário tente publicar uma mensagem em branco
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  function deleteComment(commentToDelete: string) {
    // Usa o método filter para remover um comentário
    // retorna um novo array sem o comentario contido no commentToDelete
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    // Adiciona o novo array recebido do filter
    setComments(commentsWithoutDeletedOne);

  }

  // Testa se existe algo na textarea
  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}> 
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>

      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe se feedback</strong>

        <textarea 
          name="comment" 
          placeholder='Deixe um comentário' 
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid} 
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty} >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList} >
        {comments.map(comment => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
        })}
      </div>
    </article>
  )
}