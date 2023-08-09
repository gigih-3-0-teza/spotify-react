import Card from "../atoms/Card"
import {Header} from "../organisms/Header"
import {Sidebar} from "../organisms/Sidebar"
// import { Footer } from "../organisms/Footer"

export const Base = ({children}) => {
    return (
        <div className="text-slate-300 bg-slate-950 p-2 min-h-screen box-border">
            <div className="grid gap-2 md:grid-cols-3">
                <Sidebar/>
                <div className="md:col-span-2">
                    <Card className="px-4 min-h-full">
                        <Header/>
                        <main>
                            {children}
                        </main>
                    </Card>
                </div>
            </div>
        </div>
    )
}
