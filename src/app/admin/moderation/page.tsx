export default function ModerationPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Moderation</h1>
                <p className="text-slate-400 mt-1">Review flagged content and manage moderation</p>
            </div>

            {/* Empty State */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">All Clear!</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                    No content has been flagged for review. The moderation queue is empty.
                </p>
            </div>

            {/* Moderation Guidelines */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Moderation Guidelines</h2>
                <div className="space-y-4 text-slate-400">
                    <div className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <p>Resume content is automatically scanned for inappropriate language</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <p>Flagged content will appear here for manual review</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <p>You can approve or reject flagged resumes</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <p>Users with repeated violations can be banned from the platform</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Pending Review</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-1">0</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Approved Today</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">0</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm">Rejected Today</p>
                    <p className="text-3xl font-bold text-red-400 mt-1">0</p>
                </div>
            </div>
        </div>
    );
}
