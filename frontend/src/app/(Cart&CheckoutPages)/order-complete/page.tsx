import Link from "next/link";

function OrderCompleteThanksPage() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="dark:text-white text-CourseTitle mt-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
          Thank you For Your Order
        </h1>
        <h3 className="text-center">
          <Link
            className="text-sm sm:text-base md:text-lg mt-2 inline-block hover:text-gray-800 dark:hover:text-gray-400 underline text-gray-500"
            href="/"
          >
            Proceed to home page
          </Link>
        </h3>
      </div>
    </div>
  );
}
export default OrderCompleteThanksPage;
