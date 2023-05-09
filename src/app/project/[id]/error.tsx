"use client";
const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex w-full h-screen justify-center align-middle flex-col">
      <h1 className="text-white text-center">
        {error.message || "Something went wrong"}
      </h1>
      <button
        className="text-white align-middle justify-center"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
};

export default error;
