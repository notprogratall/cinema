function identity<Type>(arg: Type): Type {
    return arg
}
function loggingIdentity<Type>(arg: Type[]): number {
    return arg.length
}



const myIdentity: <T>(arg: T) => T = identity

interface GenericIdentity {
    <T>(arg: T): T
}

const myIdentity2: GenericIdentity = identity




export default function Generics() {
    const arg = identity("identity arg ")
    const argSecond = identity<string>("identity argSecond ")
    const argThird = loggingIdentity(["1", "2", "3"])
    const argFourth = myIdentity("stringorsmth")
    const argFourth2 = myIdentity2("stringorsmth2")


    return (
        <>
            <h1
                className="text-7xl font-bold"
            >
                {arg.length}
                {argSecond}
                {argThird}
                {argFourth}
                {argFourth2}
            </h1>
        </>
    );
}