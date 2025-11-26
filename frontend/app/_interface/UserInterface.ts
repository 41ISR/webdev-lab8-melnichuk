
export default interface UserInterface {
    session: any,
    setSession: (session:any) => void,
    clearSession: () => void
}