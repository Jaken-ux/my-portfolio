export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 px-6 py-12 text-center">
        <div className="flex gap-6">
          <a
            href="mailto:Jansson.jacob@gmail.com"
            className="text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/jacob-jansson-61793023"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Jacob Jansson
        </p>
      </div>
    </footer>
  );
}
