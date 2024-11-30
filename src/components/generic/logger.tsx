export const Logger = ({ data, title }: { data: any; title?: string }) => {
    return (
        <div className="bg-slate-800 text-white p-6 m-6 rounded-lg space-y-6 max-w-3xl">
            <p className="font-semibold text-green-400">{title ?? "Data"}</p>
            <pre className="text-xs max-h-72 overflow-scroll">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};
