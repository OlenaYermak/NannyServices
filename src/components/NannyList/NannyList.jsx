import nannies from "../../nannies.json";
import NannyCard from "../NannyCard/NannyCard";

export default function NannyList() {
  return (
    <ul>
      {nannies.map((nanny, index) => {
        // Додаємо console.log для перевірки даних перед передачею в NannyCard
        console.log("Дані передані в NannyCard:", nanny);

        return (
          <li key={index}>
            <NannyCard nanny={nanny} />
          </li>
        );
      })}
    </ul>
  );
}