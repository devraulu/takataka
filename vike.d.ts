declare global {
    namespace Vike {
        interface PageContext {
            session?: SessionResponse | null;
            user?: UserResponse | null;
            Page: () => React.JSX.Element;
        }
    }
}

export {};
