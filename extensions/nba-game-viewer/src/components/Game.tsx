import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { Game } from "../types/schedule.types";
import generateGameAccessories from "../utils/generateGameAccessories";

type PropTypes = {
  game: Game;
};

const GameComponent = ({ game }: PropTypes) => {
  return (
    <List.Item
      key={game.id}
      title={game.name}
      icon={game.competitors[0].logo}
      accessories={generateGameAccessories(game)}
      actions={
        <ActionPanel>
          {/* eslint-disable-next-line @raycast/prefer-title-case */}
          {game.stream && (
            <Action.OpenInBrowser url={game.stream} title="View Game Details on ESPN" icon={Icon.Globe} />
          )}
        </ActionPanel>
      }
    />
  );
};

export default GameComponent;
