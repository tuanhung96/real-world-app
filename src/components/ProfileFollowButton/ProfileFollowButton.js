import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { followProfile, unfollowProfile } from "../../apis/profiles";

function ProfileFollowButton({ profile }) {
  const [isFollowing, setIsFollowing] = useState(() => profile.following);
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  function handleFollowProfile() {
    if (isAuthenticated) {
      const configs = {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      };
      if (isFollowing) {
        unfollowProfile(profile.username, configs).then((data) => {
          setIsFollowing(data.following);
        });
      } else {
        followProfile(profile.username, configs).then((data) => {
          setIsFollowing(data.following);
        });
      }
    } else {
      navigate("/login");
    }
  }
  return (
    <button
      class="btn btn-sm btn-outline-secondary action-btn"
      onClick={handleFollowProfile}
    >
      <i class="ion-plus-round"></i>
      {isFollowing ? "Unfollow" : "Follow"} {profile.username}
    </button>
  );
}

export default ProfileFollowButton;
