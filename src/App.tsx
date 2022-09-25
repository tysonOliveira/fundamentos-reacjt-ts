import { Header } from './components/Header';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css';

// author: { avatar_url: "", name: "", role: "" }
// publishedAt: Date
// content: String

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/tysonOliveira.png',
      name: 'Tyson Oliveira',
      role: 'Web developer'
    },
    // Aqui é importante não enviar HTML do back-end para aumentar a segurança
    // do contrario algum usuário mau intencionando poderia usar essa vulnerabilidade
    content: [
      { type: 'paragraph', content: 'Fala galera' }, 
       { type: 'paragraph', content: 'a Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ut cum dolore totam iusto animi hic laboriosam' }, 
      { type: 'Link', content: 'Developer/javaScript' },   
    ],
    publishedAt: new Date('2022-06-9 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat'
    },
    // Aqui é importante não enviar HTML do back-end para aumentar a segurança
    // do contrario algum usuário mau intencionando poderia usar essa vulnerabilidade
    content: [
      { type: 'paragraph', content: 'Fala galera' }, 
       { type: 'a Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ut cum dolore totam iusto animi hic laboriosam' }, 
      { type: 'Link', content: 'Developer/javaScript' },   
    ],
    publishedAt: new Date('2022-06-10 18:00'),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper} >
        <aside>
          <Sidebar />
        </aside>
        <main>
        {posts.map(post => {
            return (
              <Post 
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>    
      </div>
    </div>
  )
}
