import { Link, useSearchParams } from "react-router-dom";
import { mockChats } from "../data/mockChats";

export function ChatsPage() {
  const [searchParams] = useSearchParams();
  const requestedCar = searchParams.get("car");
  const activeThread = mockChats.find((thread) => thread.carId === requestedCar) ?? mockChats[0];

  return (
    <main className="chats-page">
      <section className="section chats-hero">
        <span className="section-label">Чаты</span>
        <h1>Переписка с продавцами и AutoBridge</h1>
        <p>Пока это frontend-макет: здесь будет история сообщений, перевод и статусы сделки.</p>
      </section>

      <section className="chats-shell" aria-label="Список чатов и переписка">
        <aside className="chat-thread-list">
          <div className="chat-thread-list-head">
            <h2>Диалоги</h2>
            <span>{mockChats.length}</span>
          </div>
          {mockChats.map((thread) => (
            <Link
              className={`chat-thread-item ${thread.id === activeThread.id ? "is-active" : ""}`}
              to={`/chats?car=${encodeURIComponent(thread.carId)}`}
              key={thread.id}
            >
              <span>{thread.status}</span>
              <strong>{thread.carTitle}</strong>
              <p>{thread.lastMessage}</p>
            </Link>
          ))}
        </aside>

        <article className="chat-conversation">
          <header className="chat-conversation-head">
            <div>
              <span>{activeThread.sellerName}</span>
              <h2>{activeThread.carTitle}</h2>
            </div>
            <Link to={`/catalog/${activeThread.carId}`}>Открыть карточку</Link>
          </header>

          <div className="chat-messages">
            {activeThread.messages.map((message) => {
              const isBuyer = message.authorId === "buyer";
              const author = activeThread.participants.find((participant) => participant.id === message.authorId);

              return (
                <div className={`chat-message ${isBuyer ? "is-own" : ""}`} key={message.id}>
                  <span>{author?.name ?? "AutoBridge"} · {message.time}</span>
                  <p>{message.text}</p>
                </div>
              );
            })}
          </div>

          <form className="chat-composer">
            <input placeholder="Напишите сообщение продавцу..." type="text" />
            <button type="button">Отправить</button>
          </form>
        </article>
      </section>
    </main>
  );
}
