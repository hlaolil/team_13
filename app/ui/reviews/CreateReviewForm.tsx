"use client";

type FormParams = {
  action: (formData: FormData) => void; // server action
  productId: string;
};

export default function CreateReviewForm({ action, productId }: FormParams) {
  return (
    <form action={action} className="space-y-3">
      {/* pass productId to the server via hidden input */}
      <input type="hidden" name="productId" value={productId} />

      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="rating">
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          className="w-full rounded border px-2 py-1 text-sm"
          required
        >
          <option value="">Select rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Okay</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Terrible</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="comment">
          Comment (optional)
        </label>
        <textarea
          id="comment"
          name="comment"
          className="w-full rounded border px-2 py-1 text-sm"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Submit review
      </button>
    </form>
  );
}
