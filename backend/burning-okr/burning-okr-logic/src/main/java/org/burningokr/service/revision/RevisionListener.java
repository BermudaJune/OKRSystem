package org.burningokr.service.revision;

import org.burningokr.model.revision.RevisionInformation;
import org.burningokr.model.users.User;
import org.hibernate.envers.EntityTrackingRevisionListener;
import org.hibernate.envers.RevisionType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class RevisionListener
        implements org.hibernate.envers.RevisionListener, EntityTrackingRevisionListener {

  @Override
  public void newRevision(Object revisionEntity) {
    RevisionInformation r = (RevisionInformation) revisionEntity;
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof User user) {
      r.setUserId(user.getId());
    }
  }

  @Override
  public void entityChanged(Class entityClass, String entityName, Object entityId, RevisionType revisionType, Object revisionEntity) {
    // TODO Hierher gehört nach dem Spring Upgrade (wegen fehlender DI) der Vergleich, ob es Benutzeränderungen gegeben hat. Dazu den RevisionService befähigen und hier aufrufen dazu bzw. eine Klasse für Tasks. (MV)
  }
}
