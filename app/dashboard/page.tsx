import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { logout } from '../auth/actions';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check user session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth');

  // Fetch all courses
  const { data: courses } = await supabase.from('courses').select('*');

  // Fetch user's enrolled course IDs
  const { data: userEnrollments } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', user.id);

  const enrolledIds = new Set(userEnrollments?.map((e) => e.course_id));

  async function enroll(formData: FormData) {
    'use server';
    const courseId = formData.get('courseId') as string;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('enrollments').insert([{ user_id: user.id, course_id: courseId }]);
      revalidatePath('/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Course Portal</h1>
          <p className="text-xs text-slate-500">Logged in as {user.email}</p>
        </div>
        <form action={logout}>
          <button className="text-xs text-red-600 hover:underline font-medium">Log out</button>
        </form>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses?.map((course) => {
            const isEnrolled = enrolledIds.has(course.id);
            return (
              <div key={course.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.thumbnail_url} alt={course.title} className="w-full h-44 object-cover" />
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-slate-900">{course.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{course.description}</p>
                </div>
                <div className="p-4 bg-slate-50 border-t flex justify-between items-center">
                  {isEnrolled ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      Enrolled
                    </span>
                  ) : (
                    <form action={enroll}>
                      <input type="hidden" name="courseId" value={course.id} />
                      <button type="submit" className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                        Add to My Account
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}